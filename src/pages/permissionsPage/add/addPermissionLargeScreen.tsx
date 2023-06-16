/* rect-form */
import { UseFormRegister } from "react-hook-form";

/* MUI */
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Checkbox,
} from "@mui/material";

/* components  */
import CustomTableHead from "../../../components/table/tableHead";

/* utils */
import { convertIdToPermission, permissions } from "../../../utils/converter";

/* types */
import { HeadCell } from "../../../components/types";

type Props = {
    headCell: HeadCell[];
    register: UseFormRegister<any>;
    selected: [{ privilegeId: number; permissions: any }] | null;
};

export const AddPermissionLargeScreen = ({
    headCell,
    register,
    selected,
}: Props) => {
    return (
        <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
            >
                <CustomTableHead headCell={headCell} />
                <TableBody>
                    {selected
                        ? selected.map((row, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                  <TableRow
                                      hover
                                      tabIndex={-1}
                                      key={index}
                                      sx={{ cursor: "pointer" }}
                                  >
                                      {
                                          <>
                                              {/* id */}
                                              <TableCell
                                                  align="center"
                                                  component="th"
                                                  id={labelId}
                                                  scope="row"
                                                  padding="none"
                                              >
                                                  {index + 1}
                                              </TableCell>
                                              {/* permision name */}
                                              <TableCell align="center">
                                                  {convertIdToPermission(
                                                      row.privilegeId
                                                  )}
                                              </TableCell>
                                              <TableCell align="center">
                                                  <Checkbox
                                                      value="add"
                                                      {...register(
                                                          `Permissions.${row.privilegeId}`
                                                      )}
                                                      checked={
                                                          row.permissions[0]
                                                      }
                                                      disabled={
                                                          !row.permissions[0]
                                                      }
                                                      size="small"
                                                      color="success"
                                                  />
                                              </TableCell>

                                              <TableCell align="center">
                                                  <Checkbox
                                                      checked={
                                                          row.permissions[1]
                                                      }
                                                      disabled={
                                                          !row.permissions[1]
                                                      }
                                                      value="view"
                                                      {...register(
                                                          `Permissions.${row.privilegeId}`
                                                      )}
                                                      size="small"
                                                      color="success"
                                                  />
                                              </TableCell>

                                              <TableCell align="center">
                                                  <Checkbox
                                                      checked={
                                                          row.permissions[2]
                                                      }
                                                      disabled={
                                                          !row.permissions[2]
                                                      }
                                                      value="edit"
                                                      {...register(
                                                          `Permissions.${row.privilegeId}`
                                                      )}
                                                      size="small"
                                                      color="success"
                                                  />
                                              </TableCell>

                                              <TableCell align="center">
                                                  <Checkbox
                                                      checked={
                                                          row.permissions[3]
                                                      }
                                                      disabled={
                                                          !row.permissions[3]
                                                      }
                                                      value="delete"
                                                      {...register(
                                                          `Permissions.${row.privilegeId}`
                                                      )}
                                                      size="small"
                                                      color="success"
                                                  />
                                              </TableCell>
                                          </>
                                      }
                                  </TableRow>
                              );
                          })
                        : permissions.map((row, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                  <TableRow
                                      hover
                                      tabIndex={-1}
                                      key={index}
                                      sx={{ cursor: "pointer" }}
                                  >
                                      {/* add permission */}
                                      {
                                          <>
                                              {/* id */}
                                              <TableCell
                                                  align="center"
                                                  component="th"
                                                  id={labelId}
                                                  scope="row"
                                                  padding="none"
                                              >
                                                  {index + 1}
                                              </TableCell>
                                              {/* permision name */}
                                              <TableCell align="center">
                                                  {row.name}
                                              </TableCell>
                                              <TableCell align="center">
                                                  <Checkbox
                                                      value="add"
                                                      {...register(
                                                          `Permissions.${row.name}`
                                                      )}
                                                      size="small"
                                                      color="success"
                                                  />
                                              </TableCell>

                                              <TableCell align="center">
                                                  <Checkbox
                                                      value="view"
                                                      {...register(
                                                          `Permissions.${row.name}`
                                                      )}
                                                      size="small"
                                                      color="success"
                                                  />
                                              </TableCell>

                                              <TableCell align="center">
                                                  <Checkbox
                                                      value="edit"
                                                      {...register(
                                                          `Permissions.${row.name}`
                                                      )}
                                                      size="small"
                                                      color="success"
                                                  />
                                              </TableCell>

                                              <TableCell align="center">
                                                  <Checkbox
                                                      value="delete"
                                                      {...register(
                                                          `Permissions.${row.name}`
                                                      )}
                                                      size="small"
                                                      color="success"
                                                  />
                                              </TableCell>
                                          </>
                                      }
                                  </TableRow>
                              );
                          })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
