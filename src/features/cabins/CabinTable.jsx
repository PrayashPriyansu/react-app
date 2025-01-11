import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins = [] } = useCabins();

  const [searchParams] = useSearchParams();

  if (!cabins.length) return <Empty />;

  if (isLoading) return <Spinner />;

  // A) for filter
  const filter = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filter === "all") filteredCabins = cabins;

  if (filter === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filter === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // B) for sort

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");

  let sortedCabins;

  const modifier = direction === "asc" ? 1 : -1;

  sortedCabins = filteredCabins.sort(
    (a, b) => modifier * (a[field] - b[field])
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
