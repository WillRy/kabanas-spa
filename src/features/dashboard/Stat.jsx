function Stat({ icon, title, value, color }) {
  const colorMaps = {
    'indigo': {
      bg: 'var(--color-indigo-100)',
      fg: 'var(--color-indigo-700)',
    },
    'blue': {
      bg: 'var(--color-blue-100)',
      fg: 'var(--color-blue-700)',
    },
    'green': {
      bg: 'var(--color-green-100)',
      fg: 'var(--color-green-700)',
    },
    'yellow': {
      bg: 'var(--color-yellow-100)',
      fg: 'var(--color-yellow-700)',
    },
  }
  return (
    <div className="bg-white border border-gray-100 rounded-md p-4 grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-6 gap-y-1">
      <div 
        className="row-start-1 row-end-[-1] aspect-square rounded-full flex items-center justify-center"
        style={{ 
          backgroundColor: colorMaps[color]?.bg,
        }}
      >
        <div 
          className="size-6"
          style={{ 
            color: colorMaps[color]?.fg,
          }}
        >
          {icon}
        </div>
      </div>
      <h5 className="self-end text-xs uppercase tracking-wider font-semibold text-gray-500">
        {title}
      </h5>
      <p className="text-2xl leading-none font-medium">
        {value}
      </p>
    </div>
  );
}

export default Stat;
