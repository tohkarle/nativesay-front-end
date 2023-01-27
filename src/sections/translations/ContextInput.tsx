import { Autocomplete, TextField, Card, Grid } from "@mui/material";
import { CONTEXTS } from "./utils";

const inputRootStyles = {
  ".MuiOutlinedInput-root": {
    // - The Input-root, inside the TextField-root
    "& fieldset": {
      // - The <fieldset> inside the Input-root
      borderColor: "transparent", // - Set the Input border
    },
    "&:hover fieldset": {
      borderColor: "transparent", // - Set the Input border when parent has :hover
    },
    "&.Mui-focused fieldset": {
      // - Set the Input border when parent is focused
      borderColor: "transparent",
    },
  },
};

export type Props = {
  customContexts: string[];
  setCustomContexts: React.Dispatch<React.SetStateAction<string[]>>;
};

export function ContextInput({ customContexts, setCustomContexts }: Props) {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setCustomContexts((contexts) => {
        return [...contexts, event.target.value];
      });
    }
  };

  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ mx: { xs: 0, md: 21 }, p: { xs: 0.5, md: 1 } }}>
        <Autocomplete
          multiple
          freeSolo
          options={CONTEXTS.map((option) => option)}
          ChipProps={{ size: "medium" }}
          onChange={(e, newValue) => {
            setCustomContexts(newValue);
          }}
          renderInput={(params: any) => (
            <TextField
              {...params}
              sx={{
                ...inputRootStyles,
              }}
              placeholder="Input context (optional)"
              onKeyDown={handleKeyDown}
            />
          )}
        />
      </Card>
    </Grid>
  );
}
