import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function OneWallet() {

    const navigate = useNavigate();

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card>
                <CardContent>
                    <Typography variant={"h5"} component={"div"}>
                        Name
                    </Typography>
                    <Typography variant={"body1"}>
                        Desc
                    </Typography>
                    <Typography variant={"body2"} sx={{marginTop: "1em"}}>
                        Shared with: xy, y
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size={"small"} onClick={() => navigate("/wallet/2")}>Details</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default OneWallet;