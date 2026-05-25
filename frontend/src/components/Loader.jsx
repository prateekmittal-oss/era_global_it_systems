export default function Loader({ fullScreen = false, text = 'Loading...' }) {
  const wrapper = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-slate-900/80'
    : 'flex items-center justify-center py-16';

  return (
    <div className={wrapper}>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{text}</p>
      </div>
    </div>
  );
}
