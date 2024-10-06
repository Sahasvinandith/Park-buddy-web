import { HistoryCard } from "./Historyeventcard"
export const History_page = () => {
    let event={

        "vehicle_number":"ABC123",
        "start": "2022-10-01T10:00:00.000Z",
        "end": "2022-10-01T11:00:00.000Z",
        "client_name": "Client-0",
        "client_email": "Client-0@Client-0.com",
        "vehicle_type": "Car",

    }
    return (
        <div className="flex items-center justify-center h-full w-full p-5 ">
            <div className="flex flex-col h-full w-full bg-slate-100 text-black font-semibold overflow-y-scroll">
                History
                <div>
                    <HistoryCard eventdata={event} />
                </div>
            </div>

        </div>

    )
}
