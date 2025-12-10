# 服务器端渲染重构设计文档

## 概述

本设计文档描述了将现有 Vite + React 客户端渲染应用迁移到 Next.js 服务器端渲染架构的详细方案。迁移将采用渐进式方法，确保功能完整性的同时提升性能和 SEO 表现。

## 架构

### 当前架构
- **构建工具**: Vite
- **框架**: React 18 + TypeScript
- **路由**: React Router DOM (客户端路由)
- **状态管理**: React Query + React Context
- **样式**: Tailwind CSS + shadcn/ui
- **部署**: 静态文件部署

### 目标架构
- **框架**: Next.js 14+ (App Router)
- **渲染模式**: 混合 SSR/SSG
- **路由**: Next.js 文件系统路由
- **状态管理**: React Query + React Context (保持不变)
- **样式**: Tailwind CSS + shadcn/ui (保持不变)
- **部署**: Vercel/Node.js 服务器部署

### 迁移策略
1. **阶段 1**: 设置 Next.js 项目结构
2. **阶段 2**: 迁移页面组件到 App Router
3. **阶段 3**: 配置 SSR 和元数据
4. **阶段 4**: 优化性能和 SEO
5. **阶段 5**: 测试和部署配置

## 组件和接口

### 页面组件迁移映射

```
当前结构 → Next.js App Router 结构
src/pages/Index.tsx → app/page.tsx
src/pages/About.tsx → app/about/page.tsx  
src/pages/Services.tsx → app/services/page.tsx
src/pages/Contact.tsx → app/contact/page.tsx
src/pages/NotFound.tsx → app/not-found.tsx
```

### 布局组件
- **根布局**: `app/layout.tsx` - 替代当前的 Layout 组件
- **嵌套布局**: 支持页面级别的特定布局需求
- **提供者组件**: 迁移所有 Context 提供者到根布局

### 组件库兼容性
- **Radix UI**: 完全兼容 Next.js SSR
- **shadcn/ui**: 需要配置 Tailwind 和组件导入
- **Lucide React**: 图标库保持不变
- **React Hook Form**: 客户端组件，需要 'use client' 指令

## 数据模型

### 元数据模型
```typescript
interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    images: string[];
    type: 'website' | 'article';
  };
  twitter?: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    images: string[];
  };
}
```

### 路由配置模型
```typescript
interface RouteConfig {
  path: string;
  component: React.ComponentType;
  metadata: PageMetadata;
  renderMode: 'ssg' | 'ssr' | 'isr';
  revalidate?: number; // for ISR
}
```

### 国际化模型
```typescript
interface I18nConfig {
  defaultLocale: string;
  locales: string[];
  messages: Record<string, Record<string, string>>;
}
```

## 错误处理

### 服务器端错误
- **500 错误**: 服务器渲染失败时的降级策略
- **404 错误**: 自定义 not-found 页面
- **错误边界**: React Error Boundary 组件用于客户端错误捕获

### 客户端错误
- **水合错误**: 服务器和客户端渲染不匹配的处理
- **网络错误**: React Query 的错误重试机制
- **组件错误**: 错误边界和错误状态显示

### 降级策略
- **JavaScript 禁用**: 确保基本内容可访问
- **网络慢速**: 渐进式增强和骨架屏
- **旧浏览器**: Polyfill 和兼容性处理

## 测试策略

### 单元测试
- **组件测试**: 使用 Jest + React Testing Library
- **工具函数测试**: 纯函数和 hooks 测试
- **元数据生成测试**: 验证 SEO 标签生成正确性

### 集成测试
- **页面渲染测试**: 验证 SSR 输出正确性
- **路由测试**: 验证页面导航和参数传递
- **API 路由测试**: 如果添加 API 端点的话

### 端到端测试
- **SEO 验证**: 使用工具验证元标签和结构化数据
- **性能测试**: Core Web Vitals 指标测试
- **可访问性测试**: WCAG 合规性验证

### 性能测试
- **首屏加载时间**: 测量 FCP 和 LCP 指标
- **水合时间**: 测量 TTI (Time to Interactive)
- **包大小分析**: 确保迁移后包大小合理

## 正确性属性

*属性是应该在系统所有有效执行中保持为真的特征或行为——本质上是关于系统应该做什么的正式声明。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

**属性 1: 服务器端完整渲染**
*对于任何* 有效的页面路径，服务器响应应该包含完整的 HTML 内容，包括所有文本、元数据和结构化内容
**验证: 需求 1.1, 2.1**

**属性 2: JavaScript 独立内容显示**
*对于任何* 页面，在禁用或阻止 JavaScript 执行的情况下，页面应该显示完整的内容和基本功能
**验证: 需求 1.2, 5.3**

**属性 3: 水合一致性**
*对于任何* 服务器渲染的页面，客户端水合后的 DOM 结构应该与服务器渲染的 HTML 结构保持一致
**验证: 需求 1.3**

**属性 4: 功能完整性保持**
*对于任何* 现有的交互功能（按钮点击、表单提交、导航等），迁移后应该保持相同的行为和响应
**验证: 需求 1.4, 3.1, 4.1, 4.3**

**属性 5: 客户端路由性能**
*对于任何* 页面间导航，应该使用客户端路由实现快速切换，而不触发完整的页面刷新
**验证: 需求 1.5**

**属性 6: 元数据完整性**
*对于任何* 页面，HTML 头部应该包含完整的 meta 标签，包括 title、description、Open Graph 和 Twitter Card 数据
**验证: 需求 2.2, 2.5**

**属性 7: 页面元数据唯一性**
*对于任何* 两个不同的页面路径，它们的 meta 标签内容（title、description）应该是不同的
**验证: 需求 2.3**

**属性 8: 动态元数据同步**
*对于任何* 包含动态内容的页面，meta 标签应该反映当前页面的实际内容状态
**验证: 需求 2.4**

**属性 9: 样式系统一致性**
*对于任何* 页面元素，Tailwind CSS 类应该正确应用，并且样式渲染应该在服务器端和客户端保持一致
**验证: 需求 4.2**

**属性 10: 主题切换功能**
*对于任何* 主题切换操作，页面样式应该正确更新为对应的深色或浅色模式
**验证: 需求 4.4**

**属性 11: 国际化功能保持**
*对于任何* 语言切换操作，页面文本应该正确更新为对应语言的翻译内容
**验证: 需求 4.5**

**属性 12: 性能优化实现**
*对于任何* 页面加载，应该实现渐进式增强、图片懒加载、字体优化等性能优化措施
**验证: 需求 5.1, 5.2, 5.4, 5.5**

**属性 13: 动态路由处理**
*对于任何* 参数化路由，系统应该正确解析 URL 参数并传递给相应的页面组件
**验证: 需求 6.2**

**属性 14: API 路由功能**
*对于任何* API 端点请求，系统应该正确处理并返回预期的响应数据
**验证: 需求 6.3**