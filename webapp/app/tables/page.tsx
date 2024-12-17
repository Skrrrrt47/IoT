"use client";
import { useSearchParams } from 'next/navigation';
import Beer_Command from "../components/Beer_Command";



function Page() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get('tableId');

  return (
    <>
    <Beer_Command tableId={tableId || ""} />
    </>
  )
}

export default Page