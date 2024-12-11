import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";

export default function App({status,id , capacity} : {status: boolean, id: number, capacity: number}) {
  return (
    <Card className="max-w-[400px] bg-gray-600">
      <CardHeader className="flex gap-3">
        <img src="/circle.svg" alt="Table" className="w-8 h-8" />
        <p className="text-lg font-bold">Table {id}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-row justify-between">
            <div className="w-20 bg-red-200">
                <p className="text-xl font-bold">Status : {status ? "on" : "off"}</p>
            </div>
            <div className="">
                <p>Capacity : {capacity}</p>
            </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
