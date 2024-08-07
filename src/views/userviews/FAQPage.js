import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      m="20px"
      sx={{
        backgroundColor: colors.primary[500],
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb="20px"
        color={colors.grey[100]}
        textAlign="center"
      >
        Frequently Asked Questions
      </Typography>

      <Accordion
        sx={{
          backgroundColor: colors.primary[400],
          mb: "10px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon sx={{ color: colors.greenAccent[500] }} />
          }
        >
          <Typography color={colors.greenAccent[500]} variant="h6">
            How do I place an order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>
            To place an order, follow these steps: Browse our menu and select
            the dishes you want to order. Add the selected dishes to your cart.
            Review your cart and proceed to checkout. Enter your delivery
            address and payment details. Confirm your order. You will receive a
            confirmation email or SMS with the order details.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: colors.primary[400],
          mb: "10px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon sx={{ color: colors.greenAccent[500] }} />
          }
        >
          <Typography color={colors.greenAccent[500]} variant="h6">
            What payment methods do you accept?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>
            We accept various payment methods including: Credit/Debit Cards
            (Visa, MasterCard, American Express)
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: colors.primary[400],
          mb: "10px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon sx={{ color: colors.greenAccent[500] }} />
          }
        >
          <Typography color={colors.greenAccent[500]} variant="h6">
            Can I track my order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>No, you cannot.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: colors.primary[400],
          mb: "10px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon sx={{ color: colors.greenAccent[500] }} />
          }
        >
          <Typography color={colors.greenAccent[500]} variant="h6">
            Can I modify or cancel my order after placing it?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>
            You can modify or cancel your order within a certain time frame
            after placing it. For that, you need to call us within 10 minutes of
            your order being placed.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          backgroundColor: colors.primary[400],
          mb: "10px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon sx={{ color: colors.greenAccent[500] }} />
          }
        >
          <Typography color={colors.greenAccent[500]} variant="h6">
            What should I do if I have a problem with my order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>
            If you encounter any issues with your order, please contact our
            customer support team immediately. You can reach us via:
            <ul>
              <li>Email: abc@foodeasy.com</li>
              <li>Call: 9426071125</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
