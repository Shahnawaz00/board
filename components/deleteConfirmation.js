import styles from '../styles/components/DeleteConfirmation.module.scss'

export default function DeleteConfirmation() {
  return (
    <div className={''} >
      <h3>Delete Confirmation</h3>
      <p>Are you sure you want to delete this?</p>
      <div className="buttons">
          <button>Cancel</button>
          <button>Delete</button>
      </div>
    </div>
  )
}
