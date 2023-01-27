import {
  Box,
  Typography,
  Divider,
  Button,
  styled,
  Stack,
  IconButton,
} from "@mui/material";
import Iconify from "src/components/iconify";
import History from "src/utils/storage/History";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 400,
};

const StyledButton = styled(Button)`
  &:hover {
    background: none;
  }
`;

export interface TranslationHistory {
  from_lang: string;
  to_lang: string;
  from_text: string;
  to_text: string;
}

interface Props {
  history_arr: TranslationHistory[];
  setHistory: React.Dispatch<React.SetStateAction<History | null | undefined>>;
}

export default function HistoryDisplay({ history_arr, setHistory }: Props) {
  const handleDelete = () => {};
  const handleFavorite = () => {};

  return (
    <Stack spacing={1}>
      <Divider />
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <StyledButton
          variant="text"
          color="secondary"
          onClick={() => setHistory((history) => history?.clear())}
        >
          Clear all history
        </StyledButton>
      </Stack>
      <Box>
        <Stack spacing={1}>
          {history_arr.map((history) => {
            return (
              <Box
                display="grid"
                gridTemplateColumns="2fr 0.5fr"
                borderRadius="8px"
                border="1px solid #D3D3D3"
                padding={3}
              >
                <Box display="grid" gridTemplateRows="0.5fr 1fr 1fr" gap={1}>
                  <Stack direction="row" alignItems="center">
                    <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: "#F4F6F8",
                        borderRadius: 1,
                      }}
                    >
                      {history.from_lang}
                    </Typography>
                    <Iconify icon="eva:arrow-forward-fill" />
                    <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: "#F4F6F8",
                        borderRadius: 1,
                      }}
                    >
                      {history.to_lang}
                    </Typography>
                  </Stack>
                  <Typography variant="body1">{history.from_text}</Typography>
                  <Typography variant="body1" color="grey">
                    {history.to_text}
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="end">
                  <IconButton aria-label="favorite">
                    <Iconify
                      icon="eva:star-outline"
                      width={24}
                      onClick={handleFavorite}
                    />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <Iconify
                      icon="eva:trash-2-outline"
                      width={24}
                      onClick={handleDelete}
                    />
                  </IconButton>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
}
