import * as PG from "pg-promise";

export default PG()(process.env.DATABASE_URL as string);
