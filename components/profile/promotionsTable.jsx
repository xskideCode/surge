import Button from '@components/Button'
import Image from 'next/image'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'

const PromotionsTable = () => {
  return (
    <section className="container mx-auto rounded-2xl">
      <div className="flex justify-between items-center gap-x-3">
          <h2 className="text-lg font-medium text-white">Promotions</h2>
      </div>

    <div className="flex flex-col mt-6">
        <div className="-mx-3 -my-2 overflow-x-auto md:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-700 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-400">
                                    <div className="flex items-center gap-x-3">
                                        <span>Promotion</span>
                                    </div>
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400">Status</th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400">From
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400">To
                                </th>

                                <th scope="col" className="relative py-3.5 px-4 text-sm font-normal text-gray-400">
                                    <span>Plan</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-900 divide-y divide-gray-700 ">
                            <tr>
                                <td className="px-4 py-4 text-sm min-w-[300px] font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <div className="flex items-center gap-x-2">
                                            <Image 
                                            className="object-cover rounded-full" 
                                            src="/assets/images/placeholder.png" 
                                            alt="video thumbnail"
                                            width={40}
                                            height={40}
                                            />
                                            <div>
                                                <h2 className="font-medium text-white ">Test Channel name</h2>
                                                <p className="text-sm font-normal text-gray-400">add description</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="pl-1.5 pr-2 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>

                                    <h2 className="text-sm font-normal text-gray-500">Inactive</h2>
                                  </div>
                                </td>
                                
                                <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">Jan 4, 2022</td>

                                <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">Jan 6, 2022</td>
                                
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center justify-center">
                                    <p className="px-3 py-1 text-xs text-purple-500 rounded-full bg-gray-800">3 Day Plan</p>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="px-4 py-4 text-sm min-w-[300px] font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <div className="flex items-center gap-x-2">
                                            <Image 
                                            className="object-cover rounded-full" 
                                            src="/assets/images/placeholder.png" 
                                            alt="video thumbnail"
                                            width={40}
                                            height={40}
                                            />
                                            <div>
                                                <h2 className="font-medium text-white ">Test Channel name</h2>
                                                <p className="text-sm font-normal text-gray-400">add description</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="pl-1.5 pr-2 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                    <h2 className="text-sm font-normal text-emerald-500">Active</h2>
                                  </div>
                                </td>
                                
                                <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">Jan 8, 2022</td>

                                <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">Jan 15, 2022</td>
                                
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center justify-center">
                                    <p className="px-3 py-1 text-xs text-purple-500 rounded-full bg-gray-800">Weekly Plan</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div className="flex items-center justify-between mt-6">
        <a href="#" className="flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200  border rounded-md gap-x-2 bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800">
            <HiArrowNarrowLeft />

            <span>
                previous
            </span>
        </a>

        <div className="items-center hidden lg:flex gap-x-3">
            <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md bg-gray-800">1</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">2</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">3</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">...</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">5</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">6</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">7</a>
        </div>

        <a href="#" className="flex items-center px-5 py-2 text-sm  capitalize transition-colors duration-200 border rounded-md gap-x-2 bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800">
            <span>
                Next
            </span>

            <HiArrowNarrowRight />
        </a>
    </div>
</section>
  )
}

export default PromotionsTable