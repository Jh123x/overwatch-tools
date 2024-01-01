import { Select, MenuItem } from "@mui/material";

export function OrangeMenuItem(props) {
  return (
    <MenuItem
      sx={{
        color: "#fa9c1e",
      }}
      {...props}
    />
  );
}

export function SelectMenu(props) {
  return (
    <Select
      sx={{
        color: "#fa9c1e",
        label: { color: "#fa9c1e" },
        "&& .Mui-Selected": {
          backgroundColor: "#fa9c1e",
          color: "#fa9c1e",
        },
      }}
      label="Role"
      {...props}
    />
  );
}
