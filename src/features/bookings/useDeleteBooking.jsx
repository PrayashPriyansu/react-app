import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: (data) => {
      toast.success(`Booking #${data[0].id} successfully deleted`);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (err) => toast.error(err),
  });
  return { deleteBooking, isDeletingBooking };
}
export default useDeleteBooking;
