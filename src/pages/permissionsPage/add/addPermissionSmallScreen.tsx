/* React staff */
import { useState } from "react";

/* MUI */
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    Paper,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* react hook form */
import { UseFormRegister } from "react-hook-form";

/* utils */
import { convertIdToPermission, permissions } from "../../../utils/converter";

type Props = {
    register: UseFormRegister<any>;
    selected: [{ privilegeId: number; permissions: any }] | null;
};

export const AddPermissionSmallScreen = ({ register, selected }: Props) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Paper sx={{ width: "100%" }}>
            {/* add Permissions */}
            {selected
                ? selected.map((row, index) => {
                      return (
                          <Accordion
                              key={index}
                              sx={{ px: 5 }}
                              expanded={expanded === index.toString()}
                              onChange={handleChange(index.toString())}
                          >
                              <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                              >
                                  {/* id */}
                                  <Typography
                                      sx={{ width: "33%", flexShrink: 0 }}
                                  >
                                      {index + 1}
                                  </Typography>
                                  {/* pemsion name */}
                                  <Typography sx={{ color: "text.secondary" }}>
                                      {convertIdToPermission(row.privilegeId)}
                                  </Typography>
                              </AccordionSummary>

                              <AccordionDetails>
                                  {/* id */}
                                  <Typography>الرقم : {index + 1}</Typography>
                                  {/* permission name */}
                                  <Typography>
                                      الصلاحية :{" "}
                                      {convertIdToPermission(row.privilegeId)}
                                  </Typography>
                                  {/* add */}
                                  <Box
                                      sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                      }}
                                  >
                                      <Typography sx={{ width: "60px" }}>
                                          {" "}
                                          اضافة
                                      </Typography>

                                      <Checkbox
                                          value="add"
                                          {...register(
                                              `Permissions.${row.privilegeId}`
                                          )}
                                          checked={row.permissions[0]}
                                          disabled={!row.permissions[0]}
                                          size="small"
                                          color="success"
                                      />
                                  </Box>
                                  {/* view */}
                                  <Box
                                      sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                      }}
                                  >
                                      <Typography sx={{ width: "60px" }}>
                                          {" "}
                                          عرض
                                      </Typography>

                                      <Checkbox
                                          value="view"
                                          {...register(
                                              `Permissions.${row.privilegeId}`
                                          )}
                                          checked={row.permissions[1]}
                                          disabled={!row.permissions[1]}
                                          size="small"
                                          color="success"
                                      />
                                  </Box>
                                  {/* edit */}
                                  <Box
                                      sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                      }}
                                  >
                                      <Typography sx={{ width: "60px" }}>
                                          {" "}
                                          تعديل
                                      </Typography>

                                      <Checkbox
                                          value="edit"
                                          {...register(
                                              `Permissions.${row.privilegeId}`
                                          )}
                                          checked={row.permissions[2]}
                                          disabled={!row.permissions[2]}
                                          size="small"
                                          color="success"
                                      />
                                  </Box>
                                  {/* delete */}
                                  <Box
                                      sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                      }}
                                  >
                                      <Typography sx={{ width: "60px" }}>
                                          {" "}
                                          حذف
                                      </Typography>

                                      <Checkbox
                                          value="delete"
                                          {...register(
                                              `Permissions.${row.privilegeId}`
                                          )}
                                          checked={row.permissions[3]}
                                          disabled={!row.permissions[3]}
                                          size="small"
                                          color="success"
                                      />
                                  </Box>
                              </AccordionDetails>
                          </Accordion>
                      );
                  })
                : permissions.map((row, index) => (
                      <Accordion
                          key={row.privilegeId}
                          sx={{ px: 5 }}
                          expanded={expanded === index.toString()}
                          onChange={handleChange(index.toString())}
                      >
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                          >
                              {/* id */}
                              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                  {index + 1}
                              </Typography>
                              {/* pemsion name */}
                              <Typography sx={{ color: "text.secondary" }}>
                                  {row.name}
                              </Typography>
                          </AccordionSummary>

                          <AccordionDetails>
                              {/* id */}
                              <Typography>الرقم : {row.privilegeId}</Typography>
                              {/* permission name */}
                              <Typography> الصلاحية : {row.name}</Typography>
                              <Box
                                  sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                  }}
                              >
                                  <Typography sx={{ width: "60px" }}>
                                      {" "}
                                      اضافة
                                  </Typography>

                                  <Checkbox
                                      value="add"
                                      {...register(`Permissions.${row.name}`)}
                                      size="small"
                                      color="success"
                                  />
                              </Box>

                              <Box
                                  sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                  }}
                              >
                                  <Typography sx={{ width: "60px" }}>
                                      {" "}
                                      عرض
                                  </Typography>

                                  <Checkbox
                                      value="view"
                                      {...register(`Permissions.${row.name}`)}
                                      size="small"
                                      color="success"
                                  />
                              </Box>
                              <Box
                                  sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                  }}
                              >
                                  <Typography sx={{ width: "60px" }}>
                                      {" "}
                                      تعديل
                                  </Typography>

                                  <Checkbox
                                      value="edit"
                                      {...register(`Permissions.${row.name}`)}
                                      size="small"
                                      color="success"
                                  />
                              </Box>
                              <Box
                                  sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                  }}
                              >
                                  <Typography sx={{ width: "60px" }}>
                                      {" "}
                                      حذف
                                  </Typography>

                                  <Checkbox
                                      value="delete"
                                      {...register(`Permissions.${row.name}`)}
                                      size="small"
                                      color="success"
                                  />
                              </Box>
                          </AccordionDetails>
                      </Accordion>
                  ))}
        </Paper>
    );
};
