import clsx from 'clsx';

export default function ProductStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-400 text-white': status === 'inactive',
          'bg-green-500 text-white': status === 'active',
        },
      )}
    >
      {status === 'inactive' ? (
        <>
          Inactive
        </>
      ) : null}
      {status === 'active' ? (
        <>
          Active
        </>
      ) : null}
    </span>
  );
}
