import { withLayout } from "../layout";
import * as React from "react";

interface ITable {
  table_name: string;
}

interface IProps {
  tables: ITable[];
}

const Show: React.SFC<IProps> = (props: IProps) => {
  return (
    <div>
      <h1>Tables in database</h1>
      <ul>{props.tables.map(x => <li>x.table_name</li>)}</ul>
    </div>
  );
};

export default withLayout(Show);
