'use client'
import { components } from "@/api/strapi";

interface IndexGridCategoryListProps {
    pathname: string,
    services:components["schemas"]["Service"][] | undefined
}


export default function IndexServicesList({ pathname, services } : IndexGridCategoryListProps) {
  

    return (
            <section className={"border-2 w-full mt-[20px]"}>
                service
            </section>
    
    );
}