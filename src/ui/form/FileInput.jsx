const fileInputClasses = [
  "text-base", // font-size: 1.4rem
  "rounded-sm", // border-radius: var(--border-radius-sm)

  // file selector button styles (Tailwind v4 supports `file:` variant)
  "file:font-[inherit]", // font: inherit
  "file:font-medium", // font-weight: 500
  "file:py-1", // padding-top/bottom: 0.8rem
  "file:px-[1rem]", // padding-left/right: 1.2rem
  "file:mr-[1rem]", // margin-right: 1.2rem
  "file:rounded-sm", // border-radius: var(--border-radius-sm)
  "file:border-0", // border: none
  "file:text-[var(--color-primary-50)]", // color: var(--color-primary-50)
  "file:bg-[var(--color-primary-600)]", // background-color: var(--color-primary-600)
  "file:cursor-pointer", // cursor: pointer
  "file:transition-colors", // transition: color/background-color
  "file:hover:bg-[var(--color-primary-700)]", // &:hover background
].join(" ");

function FileInput({...props}) {
  return <input type="file" className={fileInputClasses} {...props}/>;
}

export default FileInput;
