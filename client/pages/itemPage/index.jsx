import { useState } from "react"
import Edit from './[id]'

export const getServerSideProps = async () => {
    try {
        let response = await fetch('http://localhost:8080/item')
        let datas = await response.json()

        return {
            props: { datas: JSON.parse(JSON.stringify(datas)) }
        }
    } catch (error) {
        console.error(error)
        return {
            props: { datas: [] },
        }
    }
}

function Table({ datas }) {

    const handleDelete = async (id) => {
        try {

            let response = await fetch('http://localhost:8080/item/delete/' + id, {
                method: "DELETE",
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    "Content-Type": 'application/json'
                }
            })
            let data = await response.json()

            window.location.reload()

        } catch (e) {
            console.error('An error occured while deleting ', e)

        }
    }

    return (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-blue-800">
            <thead className="bg-gray-50 dark:bg-blue-800">
                <tr key={"01"}>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">itemID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">itemName</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-white">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-blue-800">
                {datas?.length > 0 ? (
                    datas.map((item, index) => {
                        return (
                            <tr key={item.itemID + "-" + index}>
                                <td className="px-6 py-4 whitespace-nowrap text-m font-semibold text-gray-800 dark:text-black">{item.itemID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-m font-medium text-gray-800 dark:text-black">{item.itemName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-m text-gray-800 dark:text-black">{item.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {/* <a className="py-1.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-500 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 mr-3"
                                        href={`./itemPage/${item._id}`}>Edit</a> */}
                                    <Edit id={item._id} />
                                    <button className="py-1.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr  >
                        <td className='text-black p-5 font-semibold '>
                            no item
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default function index(props) {

    const [item,setItem] = useState(props.datas)


    const [itemID,setItemID] = useState()
    const [itemName,setItemName] = useState()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const status = "ok"
        if(itemID && itemName){
            try {
                let response = await fetch('http://localhost:8080/item/add', {
                    method: "Post",
                    body: JSON.stringify({
                        itemID,itemName,status
                    }),
                    headers: {
                        Accept: "application/json , text/plain, */*",
                        "Content-Type": "application/json"
                    }
                })
                response = await response.json()

                setItemID('')
                setItemName('')
                
            } catch (err) {
                console.error(err)
            }
        }
        
    }

    return (
        <div className='max-w-6xl min-h-[80vh] m-auto mt-10'>
            <div className="grid grid-cols-2">
                <div>
                    <h1 className='text-2xl font-bold text-black '>Item List</h1>
                    <p className='text-gray-400 font-semibold mb-4'>There are <b className="text-gray-500">{item?.length > 0 ? (item.length): ("No")} </b> items </p>
                </div>
                <div className='flex'>
                    <form className="ml-auto my-auto" onSubmit={handleSubmit}>
                        <div className="flex w-full ">
                            <div className="flex w-full  ">
                                <label for="itemName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                <select id="itemName" onChange={e => setItemName(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose item</option>
                                    <option value="จอภาพคอมพิวเตอร์ [ Monitor ]">จอภาพคอมพิวเตอร์ [ Monitor ]</option>
                                    <option value="จอภาพโปรเจคเตอร์ [ Projector ]">จอภาพโปรเจคเตอร์ [ Projector ]</option>
                                    <option value="เครื่องคอมพิวเตอร์ [ Computer / Case ]">เครื่องคอมพิวเตอร์ [ Computer / Case ]</option>
                                    <option value="เม้าส์ [ Mouse ]">เม้าส์ [ Mouse ]</option>
                                    <option value="คีย์บอร์ด [ Keyboard ]">คีย์บอร์ด [ Keyboard ]</option>
                                    <option value="ระบบเสียง/ลำโพง [ Sound / Speaker ]">ระบบเสียง/ลำโพง [ Sound / Speaker ]</option>
                                    <option value="ไมค์โครโฟน [ Microphone ]">ไมค์โครโฟน [ Microphone ]</option>
                                    <option value="เครื่องพริ้นเตอร์ [ Printer ]">เครื่องพริ้นเตอร์ [ Printer ]</option>
                                </select>

                            </div>
                            <div className="relative w-full">
                                <input type="text" id="search-dropdown" onChange={e => setItemID(e.target.value)}
                                className="h-full block p-2.5 w-[300px] z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg  border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="itemID" />
                                <button type="submit" className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-green-600 rounded-r-lg  hover:bg-green-800  dark:bg-green-500 dark:hover:bg-green-600 ">
                                    + Add item
                                </button>
                            </div>
                        </div>
                    </form>


                    {/* <a href='./teacherPage/addTch' type="button" className=" ml-auto my-auto py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-m  dark:focus:ring-offset-gray-800"
                    >
                        + Add item
                    </a> */}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg overflow-hidden dark:border-gray-700">

                            <Table datas={item}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


