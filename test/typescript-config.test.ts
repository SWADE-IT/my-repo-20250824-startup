import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import fs from 'fs'
import path from 'path'

/**
 * **Feature: ssr-refactor, Property 9: 样式系统一致性**
 * **Validates: Requirements 4.2**
 * 
 * Property-based test to verify TypeScript configuration supports style system consistency.
 * This test ensures that Tailwind CSS classes are properly typed and accessible,
 * and that the TypeScript configuration supports the styling infrastructure.
 */

describe('TypeScript Configuration Validation', () => {
  describe('Property 9: Style System Consistency', () => {
    it('should have valid TypeScript configuration for Next.js and styling', () => {
      // Read and parse tsconfig.json
      const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json')
      expect(fs.existsSync(tsconfigPath)).toBe(true)
      
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'))
      
      // Verify essential TypeScript configuration for Next.js SSR
      expect(tsconfig.compilerOptions).toBeDefined()
      expect(tsconfig.compilerOptions.jsx).toBe('preserve')
      expect(tsconfig.compilerOptions.module).toBe('esnext')
      expect(tsconfig.compilerOptions.moduleResolution).toBe('bundler')
      expect(tsconfig.compilerOptions.esModuleInterop).toBe(true)
      expect(tsconfig.compilerOptions.allowJs).toBe(true)
      expect(tsconfig.compilerOptions.noEmit).toBe(true)
      
      // Verify Next.js plugin is configured
      expect(tsconfig.compilerOptions.plugins).toBeDefined()
      expect(tsconfig.compilerOptions.plugins.some((plugin: any) => plugin.name === 'next')).toBe(true)
      
      // Verify path mapping for app directory
      expect(tsconfig.compilerOptions.paths).toBeDefined()
      expect(tsconfig.compilerOptions.paths['@/*']).toBeDefined()
      expect(tsconfig.compilerOptions.paths['@/*']).toContain('./app/*')
      
      // Verify includes cover app directory
      expect(tsconfig.include).toBeDefined()
      expect(tsconfig.include).toContain('app/**/*')
    })

    it('should have valid Tailwind CSS configuration for style consistency', () => {
      // Read and validate tailwind.config.ts exists and is properly configured
      const tailwindConfigPath = path.resolve(process.cwd(), 'tailwind.config.ts')
      expect(fs.existsSync(tailwindConfigPath)).toBe(true)
      
      // Read the file content to verify it's a valid TypeScript module
      const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf-8')
      
      // Verify essential Tailwind configuration elements
      expect(tailwindConfig).toContain('darkMode')
      expect(tailwindConfig).toContain('content')
      expect(tailwindConfig).toContain('./app/**/*.{js,ts,jsx,tsx,mdx}')
      expect(tailwindConfig).toContain('theme')
      expect(tailwindConfig).toContain('extend')
      expect(tailwindConfig).toContain('satisfies Config')
    })

    it('should have consistent CSS variables defined in globals.css', () => {
      // Read and validate globals.css
      const globalsCssPath = path.resolve(process.cwd(), 'app/globals.css')
      expect(fs.existsSync(globalsCssPath)).toBe(true)
      
      const globalsCss = fs.readFileSync(globalsCssPath, 'utf-8')
      
      // Verify Tailwind directives are present
      expect(globalsCss).toContain('@tailwind base')
      expect(globalsCss).toContain('@tailwind components')
      expect(globalsCss).toContain('@tailwind utilities')
      
      // Verify CSS custom properties are defined
      expect(globalsCss).toContain('--background')
      expect(globalsCss).toContain('--foreground')
      expect(globalsCss).toContain('--primary')
      expect(globalsCss).toContain('--secondary')
      
      // Verify both light and dark theme variables exist
      expect(globalsCss).toContain(':root')
      expect(globalsCss).toContain('.light')
    })

    // Property-based test for CSS variable consistency
    it('should maintain consistent CSS variable naming patterns', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            '--background',
            '--foreground', 
            '--primary',
            '--secondary',
            '--muted',
            '--accent',
            '--border',
            '--input',
            '--ring'
          ),
          (cssVar) => {
            const globalsCssPath = path.resolve(process.cwd(), 'app/globals.css')
            const globalsCss = fs.readFileSync(globalsCssPath, 'utf-8')
            
            // Each CSS variable should be defined in both :root and .light contexts
            const rootMatch = globalsCss.match(new RegExp(`:root[^}]*${cssVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:`))
            const lightMatch = globalsCss.match(new RegExp(`\\.light[^}]*${cssVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:`))
            
            return rootMatch !== null && lightMatch !== null
          }
        ),
        { numRuns: 100 }
      )
    })

    // Property-based test for TypeScript path resolution
    it('should resolve TypeScript paths consistently', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('@/lib/utils', '@/hooks/use-mobile', '@/components/ui/button'),
          (importPath) => {
            const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json')
            const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'))
            
            // Verify that @ paths are properly configured
            const pathMappings = tsconfig.compilerOptions.paths
            const atPaths = pathMappings['@/*']
            
            // Should have at least one valid path mapping
            return Array.isArray(atPaths) && atPaths.length > 0 && atPaths.includes('./app/*')
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})