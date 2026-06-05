export type PropRow = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

export function PropsTable({ rows }: { rows: Array<PropRow> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface">
      <table className="w-full min-w-[680px] border-collapse">
        <thead>
          <tr>
            <th className="border-b border-line px-3.5 py-3 text-left align-top text-xs font-bold text-muted">
              Prop
            </th>
            <th className="border-b border-line px-3.5 py-3 text-left align-top text-xs font-bold text-muted">
              Type
            </th>
            <th className="border-b border-line px-3.5 py-3 text-left align-top text-xs font-bold text-muted">
              Default
            </th>
            <th className="border-b border-line px-3.5 py-3 text-left align-top text-xs font-bold text-muted">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child_td]:border-b-0">
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="border-b border-line px-3.5 py-3 text-left align-top text-[0.92rem] leading-6 text-ink">
                <code>{row.name}</code>
              </td>
              <td className="border-b border-line px-3.5 py-3 text-left align-top text-[0.92rem] leading-6 text-ink">
                <code>{row.type}</code>
              </td>
              <td className="border-b border-line px-3.5 py-3 text-left align-top text-[0.92rem] leading-6 text-ink">
                {row.default ? <code>{row.default}</code> : "-"}
              </td>
              <td className="border-b border-line px-3.5 py-3 text-left align-top text-[0.92rem] leading-6 text-ink">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
