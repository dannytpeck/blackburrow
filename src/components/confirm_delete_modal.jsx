import React from 'react';

function ConfirmDeleteModal() {
  return (
    <div id="confirmDeleteModal" className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmDeleteModalTitle">Delete Challenge</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>WARNING: Deleted challenges cannot be recovered.</p>
            <p>Are you sure you want to delete this challenge?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
