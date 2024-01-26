"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import AssigneeSelectSkeleton from "./AssigneeSelectSkeleton";

interface Props {
  issue: Issue;
  widthFull?: boolean;
}
const AssigneeSelect = ({ issue, widthFull = false }: Props) => {
  const {
    data: users,
    error: usersError,
    isLoading: isUsersLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
  });

  const {
    mutate: assignUser,
    isPending: isAssignUserPending,
    error: assignUserError,
  } = useMutation({
    mutationKey: ["issues", issue.id],
    mutationFn: (userId: string) =>
      axios.put("/api/issues/" + issue.id, {
        userId: userId === "__NONE__" ? null : userId,
      }),
  });

  if (isUsersLoading) return <AssigneeSelectSkeleton widthFull={widthFull} />;

  return (
    <Select.Root
      defaultValue={issue?.userId || "__NONE__"}
      onValueChange={(userId) => assignUser(userId)}
      disabled={isAssignUserPending || !!usersError || !!assignUserError}
    >
      <Select.Trigger placeholder="Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="__NONE__">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
export default AssigneeSelect;
