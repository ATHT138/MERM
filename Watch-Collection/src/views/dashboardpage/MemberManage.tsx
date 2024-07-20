import useFetch from "@/hooks/useFetch";
import { Response, User } from "@/models";
import { DataTable } from "./table/DataTable";
import memberColums from "./table/memberColums";

const MemberManage = () => {
  const { data: members } = useFetch<Response<User>>(`/members`);
  return (
    <div className="container w-full py-10 ms-auto">
      {members && <DataTable columns={memberColums} data={members.data} />}
    </div>
  );
};

export default MemberManage;
