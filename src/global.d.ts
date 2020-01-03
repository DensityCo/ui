// We need to tell TypeScript that when we write "import styles from './styles.module.scss' we mean to load a module (to look for a './styles.module.scss.d.ts'). 
declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}
