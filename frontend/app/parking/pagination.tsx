import React, { ChangeEvent, useEffect, useState } from "react";
import { Divider, Pagination, Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { currenPageChanged, itemsPerFetchChanged } from "../redux/features/parkingLot-slice";

export const PaginationComponent = () => {

    const parkingLotState = useSelector((state: RootState) => state.ParkingLotReducer);
    const dispatch = useDispatch<AppDispatch>();
    const [totalPages, setTotalPages] = useState<number>(1);

    const calculatetotalPages = (count: number, itemsPerFetch: number) => {
        const tp = Math.ceil(count / itemsPerFetch);
        console.log("tp::::::::::", tp);
        setTotalPages(tp);
    }

    useEffect(() => {
        calculatetotalPages(parkingLotState.slotsCount, parkingLotState.itemsPerFetch);
    }, [parkingLotState.slotsCount, parkingLotState.itemsPerFetch])

    const handleItemsPerFetchChange = (itemsPerFetch: number) => {
        dispatch(itemsPerFetchChanged(itemsPerFetch));
    }

    if (totalPages <= 1) return;

    return (
        <div className="min-w-fit flex gap-4 items-end">
            <Divider orientation="vertical" className="h-8" />
            <Pagination
                total={totalPages}
                page={parkingLotState.currentPage}
                onChange={(page: number) => dispatch(currenPageChanged(page))}
                showControls
                size="sm"
                color="secondary"
                className="min-w-fit"
            />
            <Select
                label="Items per page"
                labelPlacement="outside"
                classNames={{ value: "text-xs", base: "w-32" }}
                size="sm"
                selectedKeys={[String(parkingLotState.itemsPerFetch)]}
                startContent=" "
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleItemsPerFetchChange(Number(e.target.value))}
            >
                {[{ key: 20, label: "20" }, { key: 40, label: "40" }, { key: 100, label: "100" }].map((v, i) => (
                    <SelectItem key={v.key}>
                        {v.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}

export default PaginationComponent;