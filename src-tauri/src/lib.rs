use tauri::{command,  Emitter, Window, WindowEvent};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[command]
async fn switch_fullscreen(window: Window) -> Result<bool, String> {
    let current_fullscreen = window
        .is_fullscreen()
        .map_err(|err| format!("Error checking fullscreen state: {:?}", err))?;
    let new_fullscreen = !current_fullscreen;
    window
        .set_fullscreen(new_fullscreen)
        .map_err(|err| format!("Error toggling fullscreen: {:?}", err))
        .map(|_| new_fullscreen)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, switch_fullscreen])
        .on_window_event(|window, event| {
            match event {
                WindowEvent::Resized { .. } => {
                    let is_fullscreen = window.is_fullscreen().unwrap_or(false);
                    window
                        .emit("fullscreen-changed", is_fullscreen)
                        .expect("failed to emit fullscreen-changed event");
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}