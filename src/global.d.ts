// Please DO NOT add many types to this file!
// It is for types that *must* be global in our codebase
// NEVER use import or export keywords in this file

// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts'). 
declare module '*.scss' {
    const content: {[className: string]: string};
    export default content;
}

// These are for marking different types of "any" that are used semantically.
type InAHurry = 'InAHurry';
type FixInReview = 'FixInReview';
type FixInRefactor = 'FixInRefactor';
type Any<T extends InAHurry | FixInReview | FixInRefactor> = any;
