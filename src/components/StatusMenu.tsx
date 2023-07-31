import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

interface Props {
  selected: string;
  setSelected: (value: "todo" | "doing" | "done") => void;
}
export default function StatusMenu({ selected, setSelected }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  //   const [selected, setSelected] = React.useState<"todo" | "doing" | "done">(
  //     "todo"
  //   );
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (text: "todo" | "doing" | "done") => {
    setSelected(text);
    handleClose();
  };

  //   React.useEffect(() => {
  // navigate("?" + selected);
  //   }, [selected]);

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="primary"
        // variant="contained"
      >
        {selected}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleChange("todo")}>todo</MenuItem>
        <MenuItem onClick={() => handleChange("doing")}>doing</MenuItem>
        <MenuItem onClick={() => handleChange("done")}>done</MenuItem>
      </Menu>
    </div>
  );
}
