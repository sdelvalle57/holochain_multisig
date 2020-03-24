/************************ Import Required Libraries */
use hdk::{
    entry_definition::ValidatingEntryType,
    error::{ZomeApiError, ZomeApiResult},
    AGENT_ADDRESS, DNA_ADDRESS, PUBLIC_TOKEN,
};

use hdk::holochain_core_types::dna::entry_types::Sharing;
use hdk::holochain_core_types::{entry::Entry, validation::EntryValidationData, validation::LinkValidationData};
use holochain_wasm_utils::api_serialization::{
    get_entry::{GetEntryOptions, GetEntryResult},
    get_links::GetLinksOptions,
};

use hdk::holochain_json_api::{error::JsonError, json::JsonString};
use hdk::holochain_persistence_api::cas::content::Address;
use hdk::prelude::AddressableContent;
use hdk::prelude::LinkMatch;
use hdk::ValidationData;
use std::convert::TryFrom;
use serde_json::json;
/******************************************* */

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Multisig {
    title: String,
    description: String,
    signatories: Vec<Address>,
    required: u64,
    creator: Address
}

impl Multisig {
    pub fn new(title: String, description: String) -> Self {
        Multisig {
            title,
            description,
            signatories: vec![AGENT_ADDRESS.clone()],
            required: 1,
            creator: AGENT_ADDRESS.clone()
        }
    }

    pub fn get(address: Address) -> ZomeApiResult<Self> {
        hdk::utils::get_as_type(address.to_string().into())
    }

    pub fn from(title: String, description: String, signatories: Vec<Address>, required: u64, creator: Address) -> Self {
        Multisig {
            title,
            description,
            signatories,
            required,
            creator
        }
    }
    pub fn entry(&self) -> Entry {
        Entry::App("multisig".into(), self.into())
    }
}

pub fn create(title: String, description: String) -> ZomeApiResult<Address> {
    let new_multisig = Multisig::new(title, description);
    let new_multisig_entry = new_multisig.entry();
    let new_multisig_address = hdk::commit_entry(&new_multisig_entry)?;
    hdk::link_entries(&AGENT_ADDRESS, &new_multisig_address, "user->multisigs", "")?;
    Ok(new_multisig_address)
}


pub fn get(address: Address) -> ZomeApiResult<Multisig> {
    Multisig::get(address)
}

pub fn get_my_multisigs() -> ZomeApiResult<Vec<Address>> {
    let links = hdk::get_links(
        &AGENT_ADDRESS,
        LinkMatch::Exactly("user->multisigs"),
        LinkMatch::Any,
    )?;
    Ok(links.addresses())
}

/***********Multisig Entry Def */
pub fn entry_def() -> ValidatingEntryType {
    entry!(
        name: "multisig",
        description: "this is the multisig entry def",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | validation_data: hdk::EntryValidationData<Multisig> | {
            match validation_data {
                EntryValidationData::Create { entry, validation_data } => {
                    if !validation_data.sources().contains(&entry.creator) {
                        return Err(String::from("Only the owner can create their multisigs"));
                    }
                    validate_multisig(&entry)
                },
                EntryValidationData::Modify { new_entry: _, old_entry: _, validation_data: _, .. } => {
                    return Err(String::from("Cannot modify"));
                },
                EntryValidationData::Delete {old_entry: _, validation_data: _, .. } => {
                    return Err(String::from("Cannot delete"));
                }
            }
        },
        links: [
            from!( 
              "%agent_id",
              link_type: "user->multisigs",
              validation_package: || {
                  hdk::ValidationPackageDefinition::Entry
              }              ,
              validation: | validation_data: hdk::LinkValidationData | {
                match validation_data {
                    LinkValidationData::LinkAdd { link , ..} => {
                        let my_multisigs: Vec<Address> = get_my_multisigs()?;
                        let target: Address = link.link.target().clone();
                        if my_multisigs.contains(&target) {
                            return Err(String::from("Cannot create multisig with the same data"));
                        }
           
                      Ok(())
                   },
                   LinkValidationData::LinkRemove { ..} => {
                       Ok(())
                   }
                }
                //   match validation_data {
                //     LinkValidationData::LinkAdd {link} => {
                //        let base: Address = link.link.base().clone();

                //         // let links = hdk::get_links(
                //         //     &AGENT_ADDRESS,
                //         //     LinkMatch::Exactly("user->multisigs"),
                //         //     LinkMatch::Any,
                //         // )?;
                //         Ok(())

                //     }

                //     LinkValidationData::LinkRemove { ..} => {
                //         return Err(String::from("Cannot remove links"));
                //     }
                //   }
              }
          )
        ]
    )
}

/*********************** Multisig Validations */
fn validate_multisig(entry: &Multisig) -> Result<(), String> {
    if entry.title.len() == 0 {
        Err("Multisig title cannot be null".into())
    } else if entry.title.len() >=50 {
        Err("Multisig title too long, max 14 characters".into())
    } else if entry.description.len() == 0 {
        Err("Multisig description cannot be null".into())
    } else if entry.description.len() >= 150 {
        Err("Multisig description too long, max 50 characters".into())
    }  else {
        Ok(())
    }
}

/********************************************** */