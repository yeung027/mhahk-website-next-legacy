import Link from 'next/link'
import Image from 'next/image'
import { LiaSearchSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

interface PageHeaderProps {
    pathname: string
  }

export default function PageHeader({ pathname } : PageHeaderProps) {
    const menu_sep_classname = "border-t-[1px] border-[#4db093]"
    const menu_item_classname = "text-green2"
    const menu_item_has_subitem_classname = "items-center grid grid-cols-[auto_10vw]"
  
    

    return (
            <div className={"xl:hidden"}>
                <div className={"absolute text-[1.5rem] text-black h-[17vw] top-[2vw] right-[4vw] flex items-center"}>
                    <FiMenu className={"cursor-pointer"} />
                </div>
                <div className={"relative"}>
                    <ul className={"flex flex-col gap-[3vw] absolute w-[calc(100%+8vw)] ml-[-4vw] font-['Istok Web', Helvetica] text-[0.875rem] bg-mainGreen w-full mt-[3px] py-[10vw] px-[8vw]"}>
                        <li className={"flex"}>
                            <div className="flex flex-row-reverse pb-[4vw]">
                                <input className="text-white bg-[#4db093] focus:bg-[#61b99f] h-[27px] rounded-[3px] px-[7px] w-[124px] placeholder-white" type='search' placeholder="搜尋" />
                                <div className='absolute'>
                                    <LiaSearchSolid className='h-[27px] text-[1.3rem] text-white mr-[7px] cursor-pointer' />
                                </div>
                            </div>
                        </li>
                        <li className={`${menu_sep_classname}`} />
                        <li className={`${menu_item_classname} text-black`}>
                            首頁
                        </li>
                        <li className={`${menu_sep_classname}`} />
                        <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                            <span>
                                關於我們
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </li>
                        <li className={`${menu_sep_classname}`} />
                        <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                            <span>
                                核心服務
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </li>
                        <li className={`${menu_sep_classname}`} />
                        <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                            <span>
                                最新消息
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </li>
                        <li className={`${menu_sep_classname}`} />
                        <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                            <span>
                                出版
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </li>
                        <li className={`${menu_sep_classname}`} />
                        <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                            <span>
                                資訊分享
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </li>
                        <li className={`${menu_sep_classname}`} />
                        <li className={`${menu_item_classname} ${menu_item_has_subitem_classname}`}>                       
                            <span>
                                義工服務
                            </span>
                            <MdKeyboardArrowDown className={"ml-[5px]"} />
                        </li>
                        <li className={`${menu_sep_classname}`} />
                        <li className={`${menu_item_classname}`}>                       
                            <span>
                                職位空缺
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

    )
}
