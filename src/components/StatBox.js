import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      m="0 30px"
      p="16px 24px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="12px"
      backgroundColor={colors.primary[400]}
      sx={{
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          transform: "scale(1.02)",
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <Box mr="12px" color={colors.greenAccent[500]}>
          {icon}
        </Box>
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{ color: colors.greenAccent[500] }}
          fontWeight="bold"
        >
          {subtitle}
          
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
