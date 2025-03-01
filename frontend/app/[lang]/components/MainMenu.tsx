'use client'

import { LiaSearchSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { components } from "@/api/strapi";
import {PageCategory} from "@/models/util";
import React from "react";


const isRootItem = (
    item: components["schemas"]["MainMenuMainmenuRootitemComponent"] | components["schemas"]["MainMenuMainmenuSubmenuComponent"] | components["schemas"]["MainMenuMainmenuSubsubmenuComponent"]
  ): item is components["schemas"]["MainMenuMainmenuRootitemComponent"] => {
    return item.__component === "main-menu.mainmenu-rootitem";
};

const isSub_or_Subsubmenu = (
    item: components["schemas"]["MainMenuMainmenuRootitemComponent"] | 
          components["schemas"]["MainMenuMainmenuSubmenuComponent"] | 
          components["schemas"]["MainMenuMainmenuSubsubmenuComponent"]
): item is components["schemas"]["MainMenuMainmenuSubmenuComponent"] | 
        components["schemas"]["MainMenuMainmenuSubsubmenuComponent"] => {
    return item.__component === "main-menu.mainmenu-submenu" || 
           item.__component === "main-menu.mainmenu-subsubmenu";
};

const isSubmenu = (
    item: components["schemas"]["MainMenuMainmenuRootitemComponent"] | components["schemas"]["MainMenuMainmenuSubmenuComponent"] | components["schemas"]["MainMenuMainmenuSubsubmenuComponent"]
  ): item is components["schemas"]["MainMenuMainmenuSubmenuComponent"] => {
    return item.__component === "main-menu.mainmenu-submenu";
};

const isSubsubmenu = (
    item: components["schemas"]["MainMenuMainmenuRootitemComponent"] | components["schemas"]["MainMenuMainmenuSubmenuComponent"] | components["schemas"]["MainMenuMainmenuSubsubmenuComponent"]
  ): item is components["schemas"]["MainMenuMainmenuSubsubmenuComponent"] => {
    return item.__component === "main-menu.mainmenu-subsubmenu";
};

interface MainMenuProps {
    pathname: string,
    mainmenu:components["schemas"]["MainMenu"] | undefined,
    category: PageCategory
}

export default function MainMenu({ pathname, mainmenu, category } : MainMenuProps) {
    const [mobileShow, setMobileShow]             = useState<boolean>(false);
    const inner_classname   = "flex flex-col gap-[3vw] absolute font-Istok_Web text-[0.875rem] bg-mainGreen w-full mt-[3px] py-[10vw] px-[8vw]"
    const xl_inner_classname= "xl:bg-white xl:static xl:font-Noto_Sans xl:px-[10px] xl:flex-row xl:gap-[30px] xl:mb-[10px] xl:py-0 xl:mt-0"
    
    
    const menuBtnClick = () => {
        setMobileShow(!mobileShow)
    }

    return (
            <nav className={`z-nav`}>
                <div className={"xl:hidden absolute text-[1.5rem] text-black h-[17vw] w-[10vw] top-[2vw] right-[4vw] flex items-center justify-end transition duration-700 ease-in-out "}>
                    <FiMenu className={`${mobileShow? "scale-[0] opacity-0" : "scale-[1] opacity-100"} absolute cursor-pointer`} onClick={menuBtnClick} />
                    <IoMdClose className={`${mobileShow? "scale-[1] opacity-100" : "scale-[0] opacity-0"} absolute cursor-pointer`} onClick={menuBtnClick} />
                </div>
                <div className={"relative"}>
                    <ul className={`${mobileShow? "scale-y-[1] opacity-100" : "scale-y-[0] opacity-0 xl:scale-y-[1] xl:opacity-100"} 
                        transition duration-300 ease-in-out origin-top ${inner_classname} ${xl_inner_classname}`}>
                        <li className={"flex xl:hidden"}>
                            <div className="flex flex-row-reverse pb-[4vw]">
                                <input className="text-white bg-[#4db093] focus:bg-[#61b99f] h-[27px] rounded-[3px] px-[7px] w-[124px] placeholder-white" type='search' placeholder="搜尋" />
                                <div className='absolute'>
                                    <LiaSearchSolid className='h-[27px] text-[1.3rem] text-white mr-[7px] cursor-pointer' />
                                </div>
                            </div>
                        </li>
                        
                        {mainmenu && mainmenu.items &&
                            mainmenu.items.map((item, index) => {
                                return  <React.Fragment key={`main-menu--item-wrapper-${index}`}>
                                            {isRootItem(item) && <RootItem menu={item} index={index} category={category} />}
                                            {isSubmenu(item) && <SubMainMenu menu={item} index={index} category={category} />}
                                            {isSubsubmenu(item) && <SubSubMainMenu menu={item} index={index} category={category} />}
                                        </React.Fragment>
                            })
                        }

                    </ul>
                </div>
            </nav>

    )
}


interface RootItemProps {
    menu:components["schemas"]["MainMenuMainmenuRootitemComponent"],
    index: number,
    category: PageCategory
}
export function RootItem({ menu, index, category } : RootItemProps) {
    const sep_classname = "border-t-[1px] border-[#4db093]"
    const item_classname = "text-green2"
    const xl_menuitem = "group xl:relative xl:cursor-pointer xl:text-[#000000e3]"

    return  <React.Fragment key={`main-menu-item-wrapper-${index}`}>
                <li className={`${sep_classname} xl:hidden`} key={`sep-${index}`} />
                <li className={`${isSubsubmenu(menu)? `peer/g${String(index + 1).padStart(3, "0")}` : ''} ${item_classname} ${xl_menuitem}`} key={`main-menu-item-${index}`}>
                        <div className={`${menu.category?.category===category ? "text-black xl:text-[#000000e3]" : ""}`}>
                            {menu.title}
                        </div>
                    <div className={`${menu.category && menu.category.category === category ? "hidden xl:flex" : "hidden"} absolute w-full bottom-[-8px] h-[2px] bg-black`} />
                </li>
            </React.Fragment>
}


interface SubMenuProps {
    menu:components["schemas"]["MainMenuMainmenuSubmenuComponent"],
    index: number,
    category: PageCategory
}
export function SubMainMenu({ menu, index, category } : SubMenuProps) {
    const rootULRef = useRef<HTMLUListElement | null>(null);
    const [isCollapse, setIsCollapse] = useState<boolean>(true);
    const [animating, setAnimating] = useState(false);
    const [height, setHeight] = useState("0px");

    const sep_classname = "border-t-[1px] border-[#4db093]"
    const item_classname = " text-green2"
    const has_subitem_classname = "items-center grid grid-cols-[auto_10vw]"

    const xl_menuitem = "group xl:relative xl:cursor-pointer xl:text-[#000000e3]"
    const xl_menuitem_has_submenu_inner = "cursor-pointer xl:flex flex-row items-center"

    const submenu_classname =   `mt-[0] pt-[0] scale-[1] overflow-hidden opacity-100 
                                 
                                 static pl-[3vw]
                                 duration-300 
                                 transition transition-all ease-in-out`
    const submenu_sep_classname = "border-[#4db093]"
    const submenuitem_classname = "max-w-[200px] min-w-[160px]"

    const xl_submenu_classname = `transition duration-300 ease-in-out 
                                    xl:pl-[20px] xl:!h-auto
                                    group group-hover:xl:opacity-100 xl:scale-[0] group-hover:xl:scale-[1] 
                                    origin-top cursor-pointer 
                                    xl:duration-300 
                                    xl:absolute xl:shadow-[0_2px_5px_rgba(0,0,0,0.1)] bg-mainGreen xl:mt-[0px] px-[20px] xl:pb-[15px]
                                    text-green2 font-['Noto Sans', Helvetica] gap-4`;
    const xl_submenuitem_classname = "transition duration-300 ease-in-out pt-[15px] pb-[9px] hover:text-hoverBlue"
    const xl_submenu_sep_classname = "border-t-[1px] xl:border-[#4a9b7e]" 

    

    const menuTitleClick = () => {
        setAnimating(true);
        setIsCollapse(prev => !prev);
    
        setTimeout(() => {
            setAnimating(false);
        }, 300); // 與 Tailwind `duration-300` 一致
    };
    
    useEffect(() => {
        if (rootULRef.current) {
            if (!isCollapse) {
            // 📌 開啟動畫：設置 `height = scrollHeight`
            setHeight(`${rootULRef.current.scrollHeight}px`);
    
            // 📌 動畫完成後，設置 `auto`
            const timeout = setTimeout(() => {
                setHeight("auto");
            }, 300);
            return () => clearTimeout(timeout);
            } else {
            // 📌 先設定 `height = scrollHeight`
            setHeight(`${rootULRef.current.scrollHeight}px`);
    
            // 📌 讓瀏覽器渲染後再設置 `height = 0px`
            requestAnimationFrame(() => {
                setTimeout(() => {
                    setHeight("0px");
                }, 300);
            });
            }
        }
    }, [isCollapse]);

    return  <React.Fragment key={`main-menu-item-wrapper-${index}`}>
                <li className={`${sep_classname} xl:hidden`} key={`sep-${index}`} />
                <li className={`${isSubsubmenu(menu)? `peer/g${String(index + 1).padStart(3, "0")}` : ''} ${item_classname} ${xl_menuitem}`} key={`main-menu-item-${index}`}>
                    <div 
                        className={`${xl_menuitem_has_submenu_inner} ${has_subitem_classname} ${menu.category?.category===category ? "text-black" : ""}`}
                        onClick={menuTitleClick}
                    >
                        <span>
                            {menu.title}
                        </span>
                        <MdKeyboardArrowDown className={`ml-[5px] ${isCollapse? '' : 'rotate-180'} transition duration-300 ease-in-out `} />
                    </div>
                    
                    <div className={`${menu.category && menu.category.category === category ? "hidden xl:flex" : "hidden"} xl:absolute w-full bottom-[-8px] h-[2px] bg-black`} />
                    {menu.items &&
                        <ul
                            ref={rootULRef} 
                            className={`${submenu_classname} ${xl_submenu_classname}`} 
                            style={{ height }}
                            key={`sub-menu-ul-${menu.id}`}
                        >
                            <li className={`${submenu_sep_classname} ${xl_submenu_sep_classname} xl:hidden mt-[10px]`} key={`sep-${menu.id ?? 0}`}  />
                            
                                {menu.items.map((item, index) => {
                                return   <React.Fragment key={`menu-item-${index}`}>
                                                <li className={`${submenuitem_classname} ${xl_submenuitem_classname}`} key={`submenu-item-${item.id}-${index}`}>
                                                    <span>{item.title}</span>
                                                </li>
                                                <li className={`${submenu_sep_classname} ${xl_submenu_sep_classname} last:hidden`} key={`submenu-sep-${item.id}-${index}`} />
                                            </React.Fragment>
                                })}
                        </ul>
                    }
                </li>
            </React.Fragment>
}



interface SubSubMenuProps {
    menu:components["schemas"]["MainMenuMainmenuSubsubmenuComponent"],
    index: number,
    category: PageCategory
}
export function SubSubMainMenu({ menu, index, category } : SubSubMenuProps) {
    const menuLIRef = useRef<HTMLLIElement | null>(null);
    const menuInnerRef = useRef<HTMLDivElement | null>(null);
    const [isCollapse, setIsCollapse] = useState<boolean>(true);
    const [animating, setAnimating] = useState(false);
    const [height, setHeight] = useState("0px");

    const sep_classname = "border-t-[1px] border-[#4db093]"
    const item_classname = "text-green2"
    const has_subitem_classname = "items-center grid grid-cols-[auto_10vw]"

    const xl_menuitem = "group xl:relative xl:cursor-pointer xl:text-[#000000e3]"
    const xl_menuitem_has_submenu_inner = "cursor-pointer xl:flex flex-row items-center"

    const outter_classname =    `overflow-hidden scale-[1] opacity-100 duration-300 origin-top 
                                  xl:!h-auto  mt-[-10px] mb-[-5px]
                                  transition transition-all ease-in-out`
    const subsubmenu_classname =    `max-h-none pl-[20px] flex flex-col pt-[4vw]`

    const xl_outter_classname = `xl:static xl:mt-[1rem] xl:mx-negative_pageXLX xl:w-[calc(100%+60px)]
                                 opacity-0 xl:scale-[0]
                                 peer-hover/g${String(index + 1).padStart(3, "0")}:xl:opacity-100 peer-hover/g${String(index + 1).padStart(3, "0")}:xl:scale-[1]
                                 hover:xl:opacity-100 hover:xl:scale-[1]
                                 xl:absolute`
    const xl_subsubmenu_classname = `xl:bg-mainGreen xl:mt-[0.7rem] xl:pt-[15px]
                                     xl:flex-row
                                     cursor-pointer 
                                     text-green2 font-['Noto Sans', Helvetica] gap-4 xl:shadow-[0_2px_5px_rgba(0,0,0,0.1)] px-[20px] xl:py-[15px]`;



    const menuTitleClick = () => {
        setAnimating(true);
        setIsCollapse(prev => !prev);
    
        setTimeout(() => {
            setAnimating(false);
        }, 300); // 與 Tailwind `duration-300` 一致
    };
    
    useEffect(() => {
        if (menuInnerRef.current) {
            if (!isCollapse) {
            // 📌 開啟動畫：設置 `height = scrollHeight`
            setHeight(`${menuInnerRef.current.scrollHeight}px`);
    
            // 📌 動畫完成後，設置 `auto`
            const timeout = setTimeout(() => {
                setHeight("auto");
            }, 300);
            return () => clearTimeout(timeout);
            } else {
            // 📌 先設定 `height = scrollHeight`
            setHeight(`${menuInnerRef.current.scrollHeight}px`);
    
            // 📌 讓瀏覽器渲染後再設置 `height = 0px`
            requestAnimationFrame(() => {
                setTimeout(() => {
                    setHeight("0px");
                }, 300);
            });
            }
        }
    }, [isCollapse]);
    


      
    return  <React.Fragment key={`main-menu-sub-sub-wrapper-${index}`}>
                <li className={`${sep_classname} xl:hidden`} key={`sep-${index}`} />
                <li className={`${isSubsubmenu(menu)? `peer/g${String(index + 1).padStart(3, "0")}` : ''} ${item_classname} ${xl_menuitem} my-0`} key={`main-menu-item-${index}`}>
                    <div 
                        className={`${xl_menuitem_has_submenu_inner} ${has_subitem_classname} ${menu.category?.category===category ? "text-black" : ""}`}
                        onClick={menuTitleClick}
                    >
                        <span>
                            {menu.title}
                        </span>
                        <MdKeyboardArrowDown className={`ml-[5px] ${isCollapse? '' : 'rotate-180'} transition duration-300 ease-in-out`} />
                    </div>

                    <div className={`${menu.category && menu.category.category === category ? "hidden xl:flex" : "hidden"} xl:absolute w-full bottom-[-8px] h-[2px] bg-black`} />
                </li>
                
                <li 
                    ref={menuLIRef} 
                    className={`${outter_classname} ${xl_outter_classname}`} 
                    style={{ height }}
                    key={`sub-sub-menu-ul-${menu.id}`}
                >  
                    <div className={`w-full border-t-[1px] border-[#4db093] xl:hidden mt-[5px]`} key={`subsubmenu-sep-${index}-top`} />
                    <div ref={menuInnerRef} className={`${subsubmenu_classname} ${xl_subsubmenu_classname}`}>
                    {menu.menus &&
                        menu.menus.map((subsubmenu, y) => {
                            if(subsubmenu.items)
                                return <SubSubMainMenuItems 
                                            title={subsubmenu.title ?? ''} 
                                            items={subsubmenu.items} 
                                            index={index} 
                                            key={`SubSubMainMenuItems-${y}`} 
                                            isLast={menu.menus? (y+1)>=menu.menus.length : true}
                                        />
                        })
                        
                    }
                    </div>
                </li>
            </React.Fragment>
}

interface SubSubMenuItemsProps {
    items:components["schemas"]["MainMenuMainmenuSubsubitemComponent"][],
    title:string,
    index: number,
    isLast: boolean
}
export function SubSubMainMenuItems({ items, title, index, isLast } : SubSubMenuItemsProps) {
    const menuLIRef = useRef<HTMLUListElement | null>(null);
    const [isCollapse, setIsCollapse] = useState<boolean>(true);
    const [animating, setAnimating] = useState(false);
    const [height, setHeight] = useState("0px");

    const title_classname = `text-[0.938rem] text-[#004ee2] font-[600]`

    const menu_wrapper_classname = `transition transition-all duration-300 ease-in-out overflow-hidden
                                     xl:!h-auto
                                     ml-[4vw] xl:ml-0`
    const subsub_m_classname = ""
    const subsub_item_classname = ""
    const subsub_sep_classname = "border-[#4db093]"

    const xl_subsub_m_classname = "transition duration-300 ease-in-out pt-[0vw] pb-[2vw] xl:pt-[12px] xl:pb-[9px] hover:text-hoverBlue xl:max-w-[140px]"
    const xl_subsub_item_classname = "transition duration-300 ease-in-out pt-[3vw] pb-[1vw] xl:pt-[15px] xl:pb-[9px] hover:text-hoverBlue xl:max-w-[140px]"
    const xl_subsub_sep_classname = "border-t-[1px] xl:border-[#4a9b7e]" 

    const subsubmenu_wrapper = ``

    const menuTitleClick = () => {
        setAnimating(true);
        setIsCollapse(prev => !prev);
    
        setTimeout(() => {
            setAnimating(false);
        }, 300); // 與 Tailwind `duration-300` 一致
    };
    
    useEffect(() => {
        if (menuLIRef.current) {
            if (!isCollapse) {
            // 📌 開啟動畫：設置 `height = scrollHeight`
            setHeight(`${menuLIRef.current.scrollHeight}px`);
    
            // 📌 動畫完成後，設置 `auto`
            const timeout = setTimeout(() => {
                setHeight("auto");
            }, 300);
            return () => clearTimeout(timeout);
            } else {
            // 📌 先設定 `height = scrollHeight`
            setHeight(`${menuLIRef.current.scrollHeight}px`);
    
            // 📌 讓瀏覽器渲染後再設置 `height = 0px`
            requestAnimationFrame(() => {
                setTimeout(() => {
                    setHeight("0px");
                }, 300);
            });
            }
        }
    }, [isCollapse]);

    

    return  <ul className="mt-[0vw] xl:mt-0">
                <li 
                    className={`${subsub_m_classname} ${xl_subsub_m_classname} ${title_classname}`}
                    onClick={menuTitleClick}
                >
                    {title}
                </li>
                <li className={`${subsub_sep_classname} ${xl_subsub_sep_classname} ${isLast? 'hidden' : ''}`} key={`subsubmenu-sep-${index}-outter`} />
                <li>
                    <ul 
                        ref={menuLIRef}
                        className={`${menu_wrapper_classname}`}
                        style={{ height }}
                    >
                        {items.map((item, y) => {
                            return  <li className={``} key={`subsubmenu-item-${index}-${y}`}>
                                        <ul className={`${subsubmenu_wrapper}`}>
                                            
                                            <li className={` ${subsub_item_classname} ${xl_subsub_item_classname}`} key={`subsubmenu-item-${index}-${y}`}>
                                                {item.image &&
                                                    <img 
                                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.image.url}`} 
                                                    key={`subsubmenu-item-image-${index}`} 
                                                    className={`max-h-[60px]`}
                                                />
                                                }
                                                {!item.image && item.title}
                                            </li>
                                            <li className={`${subsub_sep_classname} ${xl_subsub_sep_classname} ${y+1===items.length? 'hidden' : ''}`} key={`subsubmenu-sep-${index}-${y}`} />
                                        </ul>
                                    </li>
                        })}
                    </ul>
                </li>
                
            </ul>
}