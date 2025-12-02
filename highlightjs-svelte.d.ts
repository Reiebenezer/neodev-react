/**
 * @fileoverview Declaration file for the highlight.js Svelte language definition.
 *
 * This file declares the shape of the module exported by the given JavaScript snippet,
 * which is a function that registers the 'svelte' language with highlight.js.
 */

import type { LanguageFn } from "highlight.js";

// Define the minimum necessary part of the HLJSApi interface that is used.
interface HLJSApi {
    /**
     * Registers a language definition.
     * @param languageName The name of the language (e.g., 'svelte').
     * @param languageDefinition A function that returns the language definition object.
     */
    registerLanguage(languageName: string, languageDefinition: LanguageFn): void;
    // We assume the full HLJSApi includes a mechanism for comments (e.g., hljs.COMMENT)
    // and the language structure (Language, contains, subLanguage, etc.)
}

// Placeholder type for the actual language definition object returned by 'e'
interface Language {
    subLanguage: string;
    contains: any[]; // In a real definition, this would be more complex (Mode[])
    // ... other properties like case_insensitive, aliases, etc.
}

// The module exports a function that takes the hljs API object and registers the language.
declare const svelteLanguageDefinitionWrapper: LanguageFn;

/**
 * The exported function registers the 'svelte' language definition with the provided
 * highlight.js instance.
 *
 * The internal function 'e' defines the language structure:
 * - It contains XML as the base subLanguage.
 * - It defines modes for <script> blocks (javascript).
 * - It defines modes for <style> blocks (css).
 * - It defines modes for Svelte control flow tags (e.g., {#if ...}, {:else}, etc.)
 * which use javascript for their content.
 *
 * @param n The highlight.js API object.
 */
declare function svelteLanguageDefinition(n: HLJSApi): void;

// According to the snippet: `module.exports=function(n){n.registerLanguage("svelte",e)};`
// and the provided structure `function e(e){...}`
declare module 'highlightjs-svelte' {
    /**
     * Registers the Svelte language definition with a highlight.js instance.
     * @param hljs The highlight.js API object.
     */
    export default svelteLanguageDefinition;
}

// If it's a typical highlight.js language file, the module exports the registration function.
export default svelteLanguageDefinition;