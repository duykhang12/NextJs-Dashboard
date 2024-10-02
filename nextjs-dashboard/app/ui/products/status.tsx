import clsx from 'clsx';
import {
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

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
           Inactive <XCircleIcon className="h-4 w-4 ml-1" />
        </>
      ) : null}
      {status === 'active' ? (
        <>
          Active <CheckCircleIcon className="h-4 w-4 ml-1" />
        </>
      ) : null}
    </span>
  );
}
