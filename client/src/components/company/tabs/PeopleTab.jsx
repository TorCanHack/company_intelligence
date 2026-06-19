import { Card, PersonRow } from '../Primitives';

export default function PeopleTab({ founders, employeeRange }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="font-handwritten text-lg text-sketch-heading">People</div>
          <div className="text-xs text-sketch-muted">
            {employeeRange ? `${employeeRange} employees` : 'Headcount unknown'} · {founders.length} key contacts
          </div>
        </div>
        <button type="button" className="flex-none rounded-md bg-sketch-accent px-3.5 py-2 text-xs text-white">
          Export contacts
        </button>
      </div>

      {founders.length === 0 ? (
        <p className="text-sm text-sketch-muted">No founder data yet.</p>
      ) : (
        <div className="grid gap-3.5 sm:grid-cols-2">
          {founders.map((person) => (
            <Card key={person.id}>
              <PersonRow person={person} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
