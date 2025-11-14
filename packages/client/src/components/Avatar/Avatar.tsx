import React, { FC, useEffect, useState, DragEvent } from 'react'
import { avatarAPI } from '@/api/avatarApi'
import './Avatar.scss'
import avatar from '@/assets/images/avatar.png'
import clip from '@/assets/images/clip.svg'
import send from '@/assets/images/send.svg'
import { hasError } from '@/utils/apiHasError'
import { transformUserDTOtoUser } from '@/utils'
import { API } from "@/data/api"

export type User = {
  id?: number
  login?: string
  firstName?: string
  secondName?: string
  displayName?: string
  avatar?: string
  phone?: string
  email?: string
}

export const Avatar: FC<User> = props => {
  const [fileSelected, setFileSelected] = useState<File>()

  const avatarUser = props.avatar
    ? `${API}/resources${props.avatar}`
    : avatar

  const displayName = props.displayName ? props.displayName : 'User'

  const handleFile = (file: File) => {
    const { type } = file
    if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
      setFileSelected(file);
    }
  }

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files

    if (!fileList) return

    handleFile(fileList[0])
  }

  const handleOndragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }

  const handleOndrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const tempFile = e.dataTransfer.files[0];
    if (tempFile) {
      handleFile(tempFile);
    }
  }

  const onAvatarUp = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()

    if (fileSelected) {
      const formData = new FormData()
      formData.append('avatar', fileSelected)

      const response = await avatarAPI.avatarUp(formData)
      console.log('response=', response);


      if (!hasError(response)) {
        localStorage.setItem('user', JSON.stringify(transformUserDTOtoUser(response)))
      }
    }
    setFileSelected(undefined)
  }

  return (
    <div className="wrap">
      <div className="avatar">
        <img src={avatarUser} alt={`user avatar ${displayName}`} />
      </div>
      <div className="change__avatar">
        <p>Select your photo</p>
        <form className="change__avatar-file" name="avatar">
          <label className="label">
            <img src={clip} alt="adding a file" />
            <input type="file" name="avatar" onChange={handleImageChange} accept="image/*" hidden />
          </label>

          <div
            className={"dragZone " + (fileSelected ? 'active' : '')}
            onDragOver={handleOndragOver}
            onDrop={handleOndrop}
          >
            <span>or drag it to the field</span>
          </div>
          <button
            className="sending__button-img"
            type="submit"
            onClick={onAvatarUp}>
            <img src={send} alt="add file" />
          </button>
        </form>
      </div>
    </div>
  )
}
