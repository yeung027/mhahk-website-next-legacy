    // ./frontend/src/app/[lang]/components/PostList.tsx
    
    import Image from "next/image";
    import Link from "next/link";
    import { getStrapiMedia, formatDate } from "../utils/api-helpers";
    
    interface Testing {
      id: 0
      attributes: {
        abc: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
    }
    
    export default function PostList({
      data: testings,
      children,
    }: {
      data: Testing[];
      children?: React.ReactNode;
    }) {
      return (
        <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testings.map((testing:any) => {
            return (
                <div>
                    {`testing:${testing.abc}`}
                </div>
            )
          })}
          </div>
          {children && children}
        </section>
      );
    }