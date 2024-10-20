import $api from '@/http/api'

export default class FileService {
  static async getFiles(dirId: any) {
    return $api.get(`api/files${dirId ? '?parent=' + dirId : ''}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  static async createDir(dirId: any, name: string) {
    return $api.post(
      `api/files`,
      {
        name,
        parent: dirId,
        type: 'dir'
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  }
  static async uploadFile(file: any, dirId: any) {
    const formData = new FormData()
    formData.append('file', file)
    if (dirId) {
      formData.append('parent', dirId)
    }
    return $api.post(`api/files/upload`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader('x-decompressed-content-length')
        console.log('totalLength', totalLength)
        if (totalLength) {
          let progress = Math.round((progressEvent.loaded * 100) / totalLength)
          console.log(progress)
        }
      }
    })
  }
  static async downloadFile(file: any) {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }
  static async deleteFile(file: any) {
    try {
      const response = await $api.delete(`api/files?id=${file._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      alert(response.data.message)
    } catch (e: any) {
      alert(e.response?.data?.message)
    }
  }
}
