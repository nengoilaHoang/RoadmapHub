export default function Modal({ header, body, footer, onClose }){
    return(
     <div class="modal fade show"  tabIndex="-1" 
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                {header}
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
              </div>
              <div class="modal-body">
                {body}
              </div>
              <div class="modal-footer">
                {footer}
              </div>
            </div>
          </div>
        </div>)
}