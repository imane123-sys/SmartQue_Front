import React from "react";

export default function QueueTable() {
  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="checkbox-column">
                <input type="checkbox" />
              </th>

              <th>Ticket ID</th>
              <th>Visitor Name</th>
              <th>Service</th>
              <th>Joined At</th>
              <th>Wait Time</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>

              <td>
                <span className="ticket-id">A-027</span>
              </td>

              <td>Marie Dupont</td>
              <td>General Consultation</td>
              <td>10:42</td>
              <td>14 min</td>

              <td>
                <span className="status waiting">Waiting</span>
              </td>

              <td className="actions-cell">
                <button className="table-action">Call</button>
              </td>
            </tr>

            <tr>
              <td>
                <input type="checkbox" />
              </td>

              <td>
                <span className="ticket-id">A-028</span>
              </td>

              <td>Jean Martin</td>
              <td>Blood Sample</td>
              <td>10:48</td>
              <td>8 min</td>

              <td>
                <span className="status waiting">Waiting</span>
              </td>

              <td className="actions-cell">
                <button className="table-action">Call</button>
              </td>
            </tr>

            <tr>
              <td>
                <input type="checkbox" />
              </td>

              <td>
                <span className="ticket-id">A-029</span>
              </td>

              <td>Sophie Bernard</td>
              <td>Pediatrics</td>
              <td>10:51</td>
              <td>5 min</td>

              <td>
                <span className="status waiting">Waiting</span>
              </td>

              <td className="actions-cell">
                <button className="table-action">Call</button>
              </td>
            </tr>

            <tr>
              <td>
                <input type="checkbox" />
              </td>

              <td>
                <span className="ticket-id">A-030</span>
              </td>

              <td>Lucas Morel</td>
              <td>General Consultation</td>
              <td>10:54</td>
              <td>2 min</td>

              <td>
                <span className="status waiting">Waiting</span>
              </td>

              <td className="actions-cell">
                <button className="table-action">Call</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div>
          Showing <strong>4</strong> of <strong>4</strong> waiting visitors
        </div>

        <div className="pagination">
          <button disabled>Previous</button>

          <span>Page 1 of 1</span>

          <button disabled>Next</button>
        </div>
      </div>
    </div>
  );
}
