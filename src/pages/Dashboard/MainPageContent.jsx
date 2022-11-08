import { Grid, Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { PieChart } from "recharts";
import Chart from "./Chart";
import CustomPieChart from "./CustomPieChart";
import Deposits from "./Deposits";
import Orders from "./Orders";

const DashboardContent = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" marginBottom={4}>Panel de novedades</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rhoncus aliquam orci ut fermentum. Aenean fermentum sed sapien at consectetur. Duis molestie iaculis lectus in vehicula. Aliquam nec velit consectetur, tincidunt arcu ac, egestas elit. Nunc a diam mollis, scelerisque massa vel, auctor risus. Nulla sed odio in libero malesuada vehicula sed elementum ante. Nullam quis lacus molestie, blandit augue porttitor, placerat metus.
            Morbi ex urna, pretium et finibus eget, ornare id augue. Mauris non molestie justo. Nulla facilisi. Maecenas ut est non lorem vestibulum commodo. Nulla scelerisque ac tortor eget eleifend. Nunc cursus, ex sit amet laoreet malesuada, ex libero cursus lectus, a ultrices elit lacus quis massa. Donec ut pretium lectus. Nam vel dui venenatis, auctor neque in, pretium leo. Fusce ac augue sed turpis imperdiet malesuada sed id lacus. Pellentesque interdum tristique tortor a ultrices. Fusce vitae sodales urna, vitae dapibus nulla. Curabitur hendrerit sem a mauris ullamcorper maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </Typography>
        </Grid>
        <Grid item container xs={8} direction="row">
          {/* Chart */}
          <Grid item container xs={12} direction="column">
            <Grid item xs={12} marginBottom={2}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 300,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <CustomPieChart title="Pagos" color="red"/>
          </Grid>
          <Grid item xs={6}>
            <CustomPieChart title="Reservas" color="blue"/>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    )
}

export default DashboardContent;