import Collections from "@/components/shared/Collections";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Search from "@/components/shared/Search";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

async function Home({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const events = await getAllEvents({
    query: searchText,
    category: category,
    page: page,
    limit: 6,
  });
  const Loader = () => {
    return <div>Loading...</div>;
  };
  return (
    <Suspense fallback={<Loader />}>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper  grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justfy-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celeberate: Your Events , Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community
            </p>
            <Button size={"lg"} asChild className="button w-full sm:w-fit">
              <Link href={"#events"}>Explore Now</Link>
            </Button>
          </div>
          <Image
            alt="hero"
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            width={1000}
            height={1000}
            src={"/assets/images/hero.png"}
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trusted by <br /> Thousands of Events
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collections
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
          userId={userId}
        />
      </section>
    </Suspense>
  );
}

export default Home;
