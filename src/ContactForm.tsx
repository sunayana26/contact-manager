import { useState } from "react"


interface Contact{
    name:string
    email:string
    phone:string
}

function ContactForm()
{
const[contact, setContact] = useState<Contact>({
    name: "",
    email:"",
    phone:""
})
const [isSubmitting, setIsSubmitting] = useState(false)

const[errors, setErrors] = useState<Partial<Contact>>({})

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
   const {name, value} = e.target

   setContact(prev=>({
         ...prev,
         [name] :value
   }))
}
const validate = ()=>{
    const newErrors:Partial<Contact> ={}
    if(contact.name.trim()==="")
    {
        newErrors.name = "Name is required"
    }
    if(contact.email.trim() === "")
    {
        newErrors.email = "Email is required"
    }
    else if (!contact.email.includes("@"))
    {
        newErrors.email= "Email is invalid"
    }
    // Phone validation
  if (contact.phone.trim() === "") {
    newErrors.phone = "Phone is required"
  }


setErrors(newErrors)
console.log(Object.keys(newErrors).length===0)
return Object.keys(newErrors).length===0
}

const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
      if (isSubmitting) return

    const isValid = validate()
    if(!isValid) return
     setIsSubmitting(true)
    console.log("Submit data:", contact)

    setContact({
        name:"",
        email:"",
        phone:""
    })
    setErrors({})
     setIsSubmitting(false)
}
    

    return(
        <div>
            Contact Form
            <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={contact.name} onChange={handleChange
            }/>   {errors.name && <p>{errors.name}</p>}
            <input type="text" name="name" value={contact.email} onChange={handleChange}/>
            {errors.email && <p>{errors.email}</p>}
            <input type="text" name="phone" value= {contact.phone} onChange={handleChange}/>
            {errors.phone && <p>{errors.phone}</p>}
            <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            </form>
        </div>
    )
}

export default ContactForm