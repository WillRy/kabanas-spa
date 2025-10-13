function TextArea({ ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full block p-2 border border-primary-100 outline-0 focus:outline-2 focus:outline-offset-[-1px] focus:outline-primary-600 rounded-md disabled:bg-stone-100 text-sm`}
    ></textarea>
  );
}

export default TextArea;
