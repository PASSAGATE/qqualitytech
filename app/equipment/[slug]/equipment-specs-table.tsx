import type { EquipmentItem } from "../data";

type EquipmentSpecsTableProps = {
  technicalSpecs: EquipmentItem["technicalSpecs"];
};

export function EquipmentSpecsTable({
  technicalSpecs,
}: EquipmentSpecsTableProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">
        기술 사양 (Technical Specifications)
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface-container-high text-left">
              <th className="border-b border-outline-variant/20 p-4 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                항목 (Item)
              </th>
              <th className="border-b border-outline-variant/20 p-4 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                상세 사양 (Specification)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {technicalSpecs.map((spec) => (
              <tr key={spec.item}>
                <td className="w-1/3 bg-surface-container-low/50 p-4 text-sm font-semibold text-primary-container">
                  {spec.item}
                </td>
                <td className="p-4 text-sm text-on-surface">
                  {spec.specification}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
