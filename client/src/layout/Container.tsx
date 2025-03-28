import {
  Container as MuiContainer,
  ContainerProps,
  styled,
} from "@mui/material";

const StyledContainer = styled(MuiContainer)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  minHeight: "100vh", // 减去Header的高度
  padding: theme.spacing(3),
  marginTop: "0", // Header的高度
  width: "100vw",
  transition: "all 0.3s ease-in-out",
}));

interface CustomContainerProps extends ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children, ...props }: CustomContainerProps) => {
  return (
    <StyledContainer maxWidth={false} {...props}>
      {children}
    </StyledContainer>
  );
};

export default Container;
