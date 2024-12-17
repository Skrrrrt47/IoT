import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function CardTables({
  status,
  id,
  capacity,
}: {
  status: boolean;
  id: number;
  capacity: number;
}) {
  const router = useRouter();

  const handleClickManage = () => {
    router.push(`/backoffice/tables?tableId=${id}`);
  };

  const handleLockTable = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tables/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: !status,
          capacity: capacity,
          dateMaintenance: new Date().toISOString(), // Set current date for maintenance
        }),
      });

      if (response.ok) {
        console.log(`Table ${id} successfully locked.`);
        alert(`Table ${id} has been locked.`);
        // Optionally, reload or refresh data after the update
        window.location.reload();
      } else {
        console.error(`Failed to lock table ${id}.`);
        alert(`Failed to lock table ${id}.`);
      }
    } catch (error) {
      console.error('Error locking table:', error);
      alert('An error occurred while locking the table.');
    }
  };

  const lockColor = status ? 'text-red-500' : 'text-green-500';
  const hoverLockColor = status ? 'hover:bg-red-700' : 'hover:bg-green-700';
  const lockText = status ? 'Lock Table' : 'Unlock Table';

  return (
    <Card className="max-w-[400px] bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex items-center gap-3 bg-gray-100 p-4 rounded-t-lg">
        <img src="/circle.svg" alt="Table Icon" className="w-10 h-10" />
        <p className="text-lg font-bold text-gray-800">Table {id}</p>
      </CardHeader>
      <Divider />
      <CardBody className="p-6">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-gray-500">Status</p>
            <p
              className={`text-lg font-bold ${
                status ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {status ? 'On' : 'Off'}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Capacity</p>
            <p className="text-lg font-bold text-gray-800">{capacity} L</p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between p-4 bg-gray-100 rounded-b-lg">
        <button
          className={`${lockColor} py-2 px-4 rounded-lg ${hoverLockColor} transition-colors duration-300`}
          onClick={handleLockTable}
        >
          {lockText}
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={handleClickManage}
        >
          Manage Table
        </button>
      </CardFooter>
    </Card>
  );
}
