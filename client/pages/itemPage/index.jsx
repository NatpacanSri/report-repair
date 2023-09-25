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
                <tr >
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">tchID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">Gender</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">Age</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-white">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-blue-800">
                {datas?.length > 0 ? (
                    datas.map((item) => {
                        return (
                            <tr key={item.itemID}> 
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{item.tchID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.gender}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{item.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a className="py-1.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-500 font-semibold text-white hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 mr-3"
                                        href={`./itemPage/${item._id}`}>Edit</a>
                                    <button className="py-1.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <p className='text-black p-5 font-semibold ' >no teacher</p>
                )}
            </tbody>
        </table>
    )
}

export default function index(props) {
    return (
        <div className='max-w-6xl min-h-[80vh] m-auto mt-10'>
            <div className="grid grid-cols-2">
                <div>
                    <h1 className='text-2xl font-bold text-black '>Item List</h1>
                    <p className='text-gray-400 font-semibold mb-4'>There are <b></b> items </p>
                </div>
                <div className='flex'>
                    
                    <a href='./teacherPage/addTch' type="button" className=" ml-auto my-auto py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-m  dark:focus:ring-offset-gray-800"
                    >
                        + Add item
                    </a>
                </div>
            </div>
            <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden dark:border-gray-700">

                                <Table datas={props} />

                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

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
