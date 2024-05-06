import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { UpdateEventParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
type UpdateEventProps = {
  params: {
    id: string;
  };
};
export default async function UpdateEvent({
  params: { id },
}: UpdateEventProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>
      <div className="wrapper my-8">
        {/* the user must have signed in so a userId property would be created , */}
        {/* clerk allows us to be able to know the id of the user that is already in session */}
        <EventForm type={"Update"} event={event} />
      </div>
    </>
  );
}
